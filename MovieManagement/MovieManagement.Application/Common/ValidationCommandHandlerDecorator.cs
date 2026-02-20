using FluentValidation;
using MovieManagement.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Common
{
    public class ValidationCommandHandlerDecorator<TCommand>
      : ICommandHandler<TCommand>
    {
        private readonly ICommandHandler<TCommand> _inner;
        private readonly IEnumerable<IValidator<TCommand>> _validators;

        public ValidationCommandHandlerDecorator(
            ICommandHandler<TCommand> inner,
            IEnumerable<IValidator<TCommand>> validators)
        {
            _inner = inner;
            _validators = validators;
        }

        public async Task HandleAsync(TCommand command)
        {
            if (_validators.Any())
            {
                var context = new ValidationContext<TCommand>(command);

                var validationResults =
                    await Task.WhenAll(
                        _validators.Select(v => v.ValidateAsync(context)));

                var failures = validationResults
                    .SelectMany(r => r.Errors)
                    .Where(f => f != null)
                    .ToList();

                if (failures.Count != 0)
                {
                    var errorMessage = string.Join(" | ",
                        failures.Select(f => f.ErrorMessage));

                    throw new Exception(errorMessage);
                }
            }

            await _inner.HandleAsync(command);
        }
    }
}
