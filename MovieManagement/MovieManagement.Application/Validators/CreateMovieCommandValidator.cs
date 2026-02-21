using FluentValidation;
using MovieManagement.Application.Commands;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieManagement.Application.Validators
{
    public class CreateMovieCommandValidator : AbstractValidator<CreateMovieCommand>

    {
        public CreateMovieCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200);

            RuleFor(x => x.Year)
                .InclusiveBetween(1900, DateTime.Now.Year)
                .WithMessage("Invalid movie year");

            RuleFor(x => x.Directors)
                .NotEmpty().WithMessage("Director is required");

            RuleFor(x => x.Genres)
                .NotEmpty().WithMessage("Genre is required");

            RuleFor(x => x.Rating)
                .InclusiveBetween(0, 10)
                .WithMessage("Rating must be between 0 and 10");

            RuleFor(x => x.RunningTimeSecs)
                .GreaterThan(0)
                .WithMessage("Running time must be greater than zero");

            RuleFor(x => x.Actors)
                .NotEmpty().WithMessage("Actors are required");

            RuleFor(x => x.ReleaseDate)
    .NotEmpty()
    .WithMessage("Release date is required")
    .Must(BeSimpleDateFormat)
    .WithMessage("Release date must be in yyyy-MM-dd format (example: 1963-12-19)");
        }

        private bool BeSimpleDateFormat(string date)
        {
            return DateTime.TryParseExact(
                date,
                "yyyy-MM-dd",
                CultureInfo.InvariantCulture,
                DateTimeStyles.None,
                out _);
        }
    }


}
